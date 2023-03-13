import { useForm } from "react-hook-form";
import { addPost } from "../redux-stuff/actions";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import { useHistory } from "react-router-dom";

function NewPost() {
  const history = useHistory();
  const user = useSelector((store) => store.user);
  const districts = useSelector((store) => store.districts);
  const userId = user.user_id;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  const dispatch = useDispatch();

  function handleAddPost(data) {
    const dataWide = {
      ...data,
      user_id: userId,
      post_date: format(new Date(), "dd/MM/yyyy"),
    };
    dispatch(addPost(dataWide, history));
    reset();
  }

  return (
    <form
      className="newPostForm max-w-md mx-auto bg-white shadow p-8 rounded-xl "
      onSubmit={handleSubmit(handleAddPost)}
    >
      <h1 className="text-2xl text-center mb-4">New Post</h1>
      <div>
        <label className="block" htmlFor="body">
          What are you thinking?
          {errors.body && (
            <span className="fieldError">{errors.body.message}</span>
          )}
          {errors.title && (
            <span className="fieldError">{errors.title.message}</span>
          )}
        </label>
        <input
          {...register("title", {
            required: "Write a title",
            maxLength: { value: 45, message: "Max length 45 characters" },
          })}
          type="text"
          placeholder="Title.."
          name="title"
          id="title"
        />
        <textarea
          {...register("body", {
            required: "Write something",
            maxLength: { value: 150, message: "Max length 150 characters" },
          })}
          name="body"
          id="body"
          rows="6"
          placeholder="Your message.."
          className="mt-4"
        ></textarea>
        <select
          name="district"
          {...register("district", { required: "Select a district" })}
        >
          <option value="">--Choose a district relevant to your post--</option>
          {districts.map((district) => (
            <option key={district} value={district}>
              {district}
            </option>
          ))}
        </select>

        <button type="submit" disabled={!isValid} className="mt-4">
          Post
        </button>
      </div>
    </form>
  );
}

export default NewPost;
