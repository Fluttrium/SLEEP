import Image from "next/image";

const SleepApneaInfo = () => {
  return (
    <div className="relative flex flex-col items-center justify-center px-4 py-8">
      {/* Фоновое изображение */}
      <div className="absolute right-0 top-0 rotate-180 -z-50">
        <Image
          src="/hero1.svg"
          alt="Icon"
          width={300}
          height={300}
          style={{ height: "100%" }}
        />
      </div>

      {/* Основной заголовок */}
      <h1 className="text-2xl md:text-4xl font-bold text-center text-gray-900 mb-4">
        Апноэ во сне и осложнения со здоровьем
      </h1>

      {/* Описание */}
      <p className="text-center text-gray-700 text-lg md:text-xl mb-8">
        Если не лечить апноэ во сне, это может привести к серьезным осложнениям.
      </p>

      {/* Карточки */}
      <div className="flex flex-wrap justify-center gap-6">
        {/* Карточка 1 */}
        <div className="flex flex-col items-center bg-white shadow-md rounded-lg p-4 w-64">
          <svg
            width="50"
            height="50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mb-4 text-red-500"
          >
            <path
              d="M24.5 42.5s-14-8.5-14-19c0-5.5 4.5-10 10-10 3 0 5.5 1.5 7 4 1.5-2.5 4-4 7-4 5.5 0 10 4.5 10 10 0 10.5-14 19-14 19Z"
              stroke="currentColor"
              strokeWidth="2"
              fill="currentColor"
            />
          </svg>
          <h2 className="text-lg font-bold text-gray-900 text-center mb-2">
            Более 60 нарушений сна
          </h2>
          <p className="text-sm text-gray-700 text-center">
            Бессонница и сонливость - основные симптомы всех нарушений сна
          </p>
        </div>

        {/* Карточка 2 */}
        <div className="flex flex-col items-center bg-white shadow-md rounded-lg p-4 w-64">
          <svg
            width="50"
            height="50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mb-4 text-blue-500"
          >
            <path
              d="M5 25h10l5-10 10 20 5-10h10"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle
              cx="25"
              cy="25"
              r="23"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
          <h2 className="text-lg font-bold text-gray-900 text-center mb-2">
            18,1%
          </h2>
          <p className="text-sm text-gray-700 text-center">
            Распространенность синдрома апноэ во сне в РФ
          </p>
        </div>

        {/* Карточка 3 */}
        <div className="flex flex-col items-center bg-white shadow-md rounded-lg p-4 w-64">
          <svg
            width="50"
            height="50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mb-4 text-green-500"
          >
            <path
              d="M15 20h20v15H15z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
              fill="currentColor"
            />
            <path d="M20 25h10v5H20z" fill="#fff" />
            <path
              d="M25 5v5M15 10h20M25 35v5M15 40h20"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <h2 className="text-lg font-bold text-gray-900 text-center mb-2">
            39%
          </h2>
          <p className="text-sm text-gray-700 text-center">
            Россиян испытывают избыточную дневную сонливость
          </p>
        </div>
      </div>
    </div>
  );
};

export default SleepApneaInfo;
