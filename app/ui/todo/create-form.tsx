import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { createTodo } from '@/app/lib/actions';

type CreateTodoInputs = {
  title: string;
  description: string;
  dueDate: Date;
  dueTime: string;
};

const createTodoSchema = yup
  .object({
    title: yup.string().required('Title is required'),
    description: yup.string().required('Description is required'),
    dueDate: yup.date().required('Due date is required'),
    dueTime: yup.string().required('Due time is required'),
  })
  .required();

export default function TodoCreateForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateTodoInputs>({
    resolver: yupResolver(createTodoSchema),
  });

  const onSubmit: SubmitHandler<CreateTodoInputs> = async (data) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('dueDate', data.dueDate.toISOString());
    formData.append('dueTime', data.dueTime);

    await createTodo(formData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex-1 pt-4 pb-8">
        <p className="text-2xl font-bold text-primary-content">NEW TASK</p>
        <div className="mt-4">
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Name</span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
              {...register('title', { required: true })}
            />
            <div className="label">
              <span className="label-text-alt text-error font-bold">
                {errors.title?.message}
              </span>
            </div>
          </label>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Description</span>
            </div>
            <textarea
              className="textarea textarea-bordered h-24"
              placeholder="Please describe the task"
              {...register('description', { required: true })}
            ></textarea>
            <div className="label">
              <span className="label-text-alt text-error font-bold">
                {errors.description?.message}
              </span>
            </div>
          </label>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Date</span>
            </div>
            <input
              type="date"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
              {...register('dueDate', { required: true })}
            />
            <div className="label">
              <span className="label-text-alt text-error font-bold">
                {errors.dueDate?.message}
              </span>
            </div>
          </label>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Date</span>
            </div>
            <input
              type="time"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
              {...register('dueTime', { required: true })}
            />
            <div className="label">
              <span className="label-text-alt text-error font-bold">
                {errors.dueTime?.message}
              </span>
            </div>
          </label>
          <button type="submit" className="btn btn-primary btn-block mt-4">
            Add
          </button>
        </div>
      </div>
    </form>
  );
}
