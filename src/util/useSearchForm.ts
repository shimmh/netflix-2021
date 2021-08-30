import { useForm } from "react-hook-form";
import { useHistory } from "react-router";

const useSearchForm = () => {
  const { register, handleSubmit } = useForm();
  const history = useHistory();

  const onSubmit = async (data: React.FormEventHandler<HTMLFormElement>) => {
    const term = Object.values(data)[0];
    if (term === null) {
      return;
    }

    if (term) {
      history.push({
        pathname: "search",
        state: `${term}`,
      });
    }
  };

  return {
    register,
    handleSubmit,
    onSubmit,
  };
};

export default useSearchForm;
