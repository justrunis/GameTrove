import Input from "../UI/Input";
import Modal from "../UI/Modal";
import Button from "../UI/Button";
import { updateUserGameProgress } from "../../api/http";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../api/http";
import { toast } from "react-toastify";

export default function GameProgressModal({
  isOpen,
  setIsOpen,
  selectedGame,
  setSelectedGame,
}) {
  const { mutate } = useMutation({
    mutationFn: updateUserGameProgress,
    onSuccess: () => {
      queryClient.invalidateQueries("user-games");
      toast.success("Game status changed");
      setIsOpen(false);
    },
    onSettled: () => {
      setIsOpen(false);
    },
    onError: (error) => {
      toast.error(error.message || "An error has occurred");
    },
  });

  const formatDate = (isoDate) => {
    if (!isoDate) return "";
    const date = new Date(isoDate);
    return date.toISOString().slice(0, 16);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSelectedGame((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate({ data: selectedGame });
  };

  return (
    <Modal open={isOpen} onClose={() => setIsOpen(false)}>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <Input
          label="Started At"
          type="datetime-local"
          name="startedAt"
          value={formatDate(selectedGame.startedAt)}
          onChange={handleChange}
          labelClassName="text-lg font-bold"
          inputClassName="input input-bordered"
        />
        <Input
          label="Completed At"
          type="datetime-local"
          name="completedAt"
          value={formatDate(selectedGame.completedAt)}
          onChange={handleChange}
          labelClassName="text-lg font-bold"
          inputClassName="input input-bordered"
        />
        <Input
          label="Play Time (hours)"
          type="number"
          name="playTime"
          value={selectedGame.playTime}
          onChange={handleChange}
          labelClassName="text-lg font-bold"
          inputClassName="input input-bordered"
        />
        <Input
          label="Rating"
          type="number"
          name="rating"
          value={selectedGame.rating}
          onChange={handleChange}
          min="0"
          max="10"
          step="0.1"
          labelClassName="text-lg font-bold"
          inputClassName="input input-bordered"
        />
        <div className="flex items-center gap-2">
          <label className="font-semibold">Has Beaten</label>
          <Input
            type="checkbox"
            name="hasBeaten"
            checked={selectedGame.hasBeaten}
            onChange={handleChange}
            className="checkbox checkbox-primary"
          />
        </div>
        <Input
          label="Review"
          type="text"
          name="review"
          value={selectedGame.review}
          onChange={handleChange}
          labelClassName="text-lg font-bold"
          inputClassName="input input-bordered"
          isTextarea={true}
        />

        <div className="flex justify-end gap-2">
          <Button
            onClick={() => setIsOpen(false)}
            type="button"
            className="btn btn-error"
          >
            Close
          </Button>
          <Button type="submit" className="btn btn-primary">
            Save Progress
          </Button>
        </div>
      </form>
    </Modal>
  );
}
