export type TodoItem = {
  id: string;
  text: string;
  isLiked: boolean;
};

export default function Todo({
  data,
  onComplete,
  onLike,
}: {
  data: TodoItem;
  onComplete: CallableFunction;
  onLike: CallableFunction;
}) {
  return (
    <div className="flex">
      <input className="mr-2" type="checkbox" onClick={() => onComplete()} />
      <span>{data.text}</span>
      <img
        className="w-5 flex-end ml-6 hover:cursor-pointer"
        alt=""
        onClick={() => onLike()}
        src={`/public/heart-${data.isLiked ? "solid" : "regular"}.svg`}
      />
    </div>
  );
}
