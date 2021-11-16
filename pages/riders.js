import { useFormik } from 'formik';
import axios from 'axios';

export default () => {
  const formik = useFormik({
    initialValues: {
      riders: '',
    },
    onSubmit: async (values) => {
      const { riders } = values;
      try {
        const { data } = await axios({
          url: '/api/delete-riders',
          method: 'delete',
          body: { riders },
        });

        console.log(data);
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <>
      <h1>Riders</h1>

      <hr />

      <h2>Delete rider entries</h2>

      <p>
        A comma seperated list of rider names, they must match exactly to be deleted (no encoded
        characters, i.e dont copy from a url)
      </p>

      <form onSubmit={formik.handleSubmit}>
        <label>
          <span>Rider names</span>

          <textarea height="200" name="riders" onChange={formik.handleChange} />
        </label>

        <button type="submit">Submit</button>
      </form>

      <hr />
    </>
  );
};
