import React, {ChangeEvent, FormEventHandler, useState} from 'react';
import axios from "axios";
interface MyComponentProps {
  title: string;
}

const MyComponent: React.FC<MyComponentProps> = ({ title }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    email: '',
    password: '',
    isAdmin: false,
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<any[]>([]);
  const [successForm, setSuccessForm] = useState<boolean>(false);

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    try {
      // Make a POST request to the API endpoint
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/v1/data`, formData);

      // Handle successful response
      console.log('Response from API:', response.data);
      if (response.data?.success) {
        setSuccessForm(true)
      }
    } catch (error: any) {
      // Handle error
      console.error('Error:', error.response?.data);
      if (error.response && error.response.data && error.response.data.errors) {
        setErrors(error.response.data.errors);
      }
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;

    // If the input type is a checkbox, handle the checked state
    if (type === 'checkbox') {
      const isChecked = (e.target as HTMLInputElement).checked;
      setFormData({ ...formData, [name]: isChecked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  return (
    <div className="w-full max-w-5xl p-5 mx-auto">
      <h1 className="text-center text-3xl font-bold text-white">
        {title}
      </h1>
      {
        successForm ?
          <div className="bg-white-100 border border-white-400 text-white px-4 py-3 rounded relative mt-8 text-xl">
            <strong className="font-bold">Your data has been successfully created !</strong>
          </div> :
          <>
            {/* Display errors above the form */}
            {errors.length > 0 && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative my-4 text-xl">
                <strong className="font-bold">Oops!</strong>
                <ul>
                  {errors.map((error, index) => (
                    <li key={index}>{error.message}</li>
                  ))}
                </ul>
              </div>
            )}
            <form
              onSubmit={onSubmit}
              className="mt-10 max-w-sm mx-auto flex flex-col gap-2"
            >
              <div>
                <label className="text-white">Name:</label>
                <input className="px-5 py-2 outline-none border border-gray-300 w-full rounded-md" type="text" name="name" value={formData.name} onChange={handleChange} />
                {/*{errors?.name && <p>{errors.name}</p>}*/}
              </div>
              <div>
                <label className="text-white">Phone:</label>
                <input className="px-5 py-2 outline-none border border-gray-300 w-full rounded-md" type="text" name="phone" value={formData.phone} onChange={handleChange} />
                {/*{errors?.phone && <p>{errors.phone}</p>}*/}
              </div>
              <div>
                <label className="text-white">Address:</label>
                <textarea className="px-5 py-2 outline-none border border-gray-300 w-full rounded-md" name="address" value={formData.address} onChange={handleChange} />
                {/*{errors?.address && <p>{errors.address}</p>}*/}
              </div>
              <div>
                <label className="text-white">Email:</label>
                <input className="px-5 py-2 outline-none border border-gray-300 w-full rounded-md" type="email" name="email" value={formData.email} onChange={handleChange} />
                {/*{errors?.email && <p>{errors.email}</p>}*/}
              </div>
              <div>
                <label className="text-white">Password:</label>
                <input className="px-5 py-2 outline-none border border-gray-300 w-full rounded-md" type="password" name="password" value={formData.password} onChange={handleChange} />
                {/*{errors?.password && <p>{errors.password}</p>}*/}
              </div>
              <div>
                <label className="text-white">Confirm Password:</label>
                <input className="px-5 py-2 outline-none border border-gray-300 w-full rounded-md" type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
                {/*{errors?.confirmPassword && <p>{errors.confirmPassword}</p>}*/}
              </div>
              <div>
                <label className="text-white">Admin:</label>
                <input className="ml-3 outline-none border border-gray-300 rounded-md" type="checkbox" name="isAdmin" checked={formData.isAdmin} onChange={handleChange} />
              </div>
              {/*className="px-5 py-2 outline-none border border-gray-300 w-full rounded-md"*/}
              <button
                type="submit"
                className="py-2 px-5 mt-2 rounded-lg border hover:bg-gray-50 text-white"
              >
                Submit
              </button>
            </form>
          </>
      }
    </div>
  )
};

export default MyComponent;
