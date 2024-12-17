export const dynamic = "force-dynamic";

import { PostPageComp } from "@/components/postsforuser/PostPageComp";

export default function PostPage() {
    return (
        <div className="h-screen w-screen overflow-hidden">
            <PostPageComp showLimited={false} />
        </div>
    );
}
