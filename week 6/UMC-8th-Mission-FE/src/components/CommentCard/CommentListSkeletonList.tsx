import CommentListSkeleton from "./CommentListSkeleton";

interface CommentListSkeletonListProps {
  count: number;
}

const CommentListSkeletonList = ({ count }: CommentListSkeletonListProps) => {
  return (
    <div className="mt-10 text-white space-y-4">
      {Array.from({ length: count }).map((_, idx) => (
        <CommentListSkeleton key={idx} />
      ))}
    </div>
  );
};

export default CommentListSkeletonList;
