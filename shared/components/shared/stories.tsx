'use client';

import React from 'react';
import { Container } from './container';

import { X } from 'lucide-react';
import ReactStories from 'react-insta-stories';
import { cn } from '@/lib/utils';
import { IStory } from '@/services/stories';
import { Api } from '@/services/api-client';

interface Props {
  className?: string;
}

export const Stories: React.FC<Props> = ({ className }) => {
  const [stories, setStories] = React.useState<IStory[]>([]);
  const [open, setOpen] = React.useState(false);
  const [selectedStory, setSelectedStory] = React.useState<IStory>();

  React.useEffect(() => {
    async function fetchStories() {
      try {
        const data = await Api.stories.getAll();
        if (Array.isArray(data)) {
          setStories(data);
        } else {
          console.error("API returned invalid data:", data);
        }
      } catch (error) {
        console.error("Failed to fetch stories:", error);
      }
    }

    fetchStories();
  }, []);

  const onClickStory = (story: IStory) => {
    setSelectedStory(story);

    if (Array.isArray(story.items) && story.items.length > 0) {
      setOpen(true);
    }
  };

  return (
    <>
      <Container className={cn('flex items-center justify-between gap-2 my-10', className)}>
        {stories.length === 0 &&
          [...Array(6)].map((_, index) => (
            <div key={index} className="w-[200px] h-[250px] bg-gray-200 rounded-md animate-pulse" />
          ))}

        {Array.isArray(stories) &&
          stories.map((story) => (
            <img
              key={story.id}
              onClick={() => onClickStory(story)}
              className="rounded-md cursor-pointer"
              height={250}
              width={200}
              src={story.previewImageUrl}
            />
          ))}

        {open && (
          <div className="absolute left-0 top-0 w-full h-full bg-black/80 flex items-center justify-center z-30">
            <div className="relative" style={{ width: 520 }}>
              <button className="absolute -right-10 -top-5 z-30" onClick={() => setOpen(false)}>
                <X className="absolute top-0 right-0 w-8 h-8 text-white/50" />
              </button>

              <ReactStories
                onAllStoriesEnd={() => setOpen(false)}
                stories={
                  Array.isArray(selectedStory?.items)
                    ? selectedStory.items.map((item) => ({ url: item.sourceUrl }))
                    : []
                }
                defaultInterval={3000}
                width={520}
                height={800}
              />
            </div>
          </div>
        )}
      </Container>
    </>
  );
};
