import Link from "next/link";
type PropsType = {
  message: string;
};
const TestingPresentation = ({ message }: PropsType) => {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{message}</h1>
      <div>
        <Link href="/todos" className="underline hover:no-underline">
          Go to Todo List
        </Link>
      </div>
    </div>
  );
};

export default TestingPresentation;
