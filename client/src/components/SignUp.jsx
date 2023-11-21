import React, { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import TextInput from './TextInput';
import CustomButton from './CustomButton';

// Import your Redux actions or thunks here
// import { registerUser, loginUser } from '../redux/userSlice'; // Adjust the import path based on your project structure

const SignUp = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const location = useLocation();

  const [isRegister, setIsRegister] = useState(true);
  const [accountType, setAccountType] = useState('student'); // Default to student

  const [errMsg, setErrMsg] = useState('');
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  });

  let from = location.state?.from?.pathname || '/';

  const closeModal = () => setOpen(false);

  // Define your onSubmit function here
  const onSubmit = async (data) => {
    try {
      // Add additional logic based on account type (seeker or teacher)
      if (isRegister) {
        // Register the user (common registration logic)
        await dispatch(register(data));
      } else {
        // Log in the user (common login logic)
        await dispatch(loginUser(data));
      }
  
      // Additional logic based on account type
      if (accountType === 'teacher') {
        // Handle teacher-specific data
        await dispatch(teacherSignup(data.teacherData));
      } else if (accountType === 'student') {
        // Handle student-specific data
        await dispatch(studentSignup(data.studentData));
      }
  
      // Close the modal after successful registration or login
      closeModal();
    } catch (error) {
      // Handle errors, update errMsg state, etc.
      setErrMsg('An error occurred during registration or login.');
      console.error(error);
    }
  };
  

  return (
    <>
      <Transition appear show={open || false}>
        <Dialog as="div" className="relative z-10 " onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto ">
            <div className="flex min-h-full items-center justify-center p-4 text-center ">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all ">
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-semibold lwading-6 text-gray-900"
                  >
                    {isRegister ? 'Create Account' : 'Account Sign In'}
                  </Dialog.Title>

                  <div className="w-full flex items-center justify-center py-4 ">
                    <button
                      className={`flex-1 px-4 py-2 rounded text-sm outline-none ${
                        accountType === 'student'
                          ? 'bg-[#1d4fd862] text-blue-900 font-semibold'
                          : 'bg-white border border-blue-400'
                      }`}
                      onClick={() => setAccountType('student')}
                    >
                      Student Account
                    </button>
                    <button
                      className={`flex-1 px-4 py-2 rounded text-sm outline-none ${
                        accountType === 'teacher'
                          ? 'bg-[#11141c62] text-blue-900 font-semibold'
                          : 'bg-white border border-blue-400'
                      }`}
                      onClick={() => setAccountType('teacher')}
                    >
                      Teacher Account
                    </button>
                  </div>

                  <form
                    className="w-full flex flex-col gap-5"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <TextInput
                      name="email"
                      label="Email Address"
                      placeholder="email@example.com"
                      type="email"
                      register={register('email', {
                        required: 'Email Address is required!',
                      })}
                      error={errors.email ? errors.email.message : ''}
                    />

                    {isRegister && (
                      <div className="w-full flex gap-1 md:gap-2">
                        <div
                          className={`${
                            accountType === 'student' ? 'w-1/2' : 'w-full'
                          }`}
                        >
                          <TextInput
                            name={
                              accountType === 'student' ? 'firstName' : 'name'
                            }
                            label={
                              accountType === 'student'
                                ? 'First Name'
                                : 'Teacher Name'
                            }
                            placeholder={
                              accountType === 'student'
                                ? 'Firstname'
                                : 'Teacher name'
                            }
                            type="text"
                            register={register(
                              accountType === 'student' ? 'firstName' : 'name',
                              {
                                required:
                                  accountType === 'student'
                                    ? 'First Name is required'
                                    : 'Teacher Name is required',
                              }
                            )}
                            error={
                              accountType === 'student'
                                ? errors.firstName
                                  ? errors.firstName?.message
                                  : ''
                                : errors.name
                                ? errors.name?.message
                                : ''
                            }
                          />
                        </div>

                        {accountType === 'student' && isRegister && (
                          <div className="w-1/2">
                            <TextInput
                              name="lastName"
                              label="Last Name"
                              placeholder="lastname"
                              type="text"
                              register={register('lastName', {
                                required: 'Last Name is required',
                              })}
                              error={
                                errors.lastName ? errors.lastName?.message : ''
                              }
                            />
                          </div>
                        )}
                      </div>
                    )}

                    <div className="w-full flex gap-1 md:gap-2">
                      <div className={`${isRegister ? 'w-1/2' : 'w-full'}`}>
                        <TextInput
                          name="password"
                          label="Password"
                          placeholder="Password"
                          type="password"
                          register={register('password', {
                            required: 'Password is required!',
                          })}
                          error={
                            errors.password ? errors.password?.message : ''
                          }
                        />
                      </div>

                      {isRegister && (
                        <div className="w-1/2">
                          <TextInput
                            label="Confirm Password"
                            placeholder="Password"
                            type="password"
                            register={register('cPassword', {
                              validate: (value) => {
                                const { password } = getValues();

                                if (password !== value) {
                                  return 'Passwords do not match';
                                }
                              },
                            })}
                            error={
                              errors.cPassword &&
                              errors.cPassword.type === 'validate'
                                ? errors.cPassword?.message
                                : ''
                            }
                          />
                        </div>
                      )}
                    </div>

                    {/* Additional fields based on account type */}
                    {accountType === 'teacher' && (
                      <>
                       <TextInput
                          name="contactNumber"
                          label="Contact Number"
                          placeholder="Contact Number"
                          type="tel"
                          register={register('contactNumber', {
                            required: 'Contact Number is required!',
                          })}
                          error={
                            errors.contactNumber
                              ? errors.contactNumber.message
                              : ''
                          }
                        />

                        <TextInput
                          name="location"
                          label="Location"
                          placeholder="Location"
                          type="text"
                          register={register('location', {
                            required: 'Location is required!',
                          })}
                          error={errors.location ? errors.location.message : ''}
                        />

                        <TextInput
                          name="educationLevel"
                          label="Education Level"
                          placeholder="Education Level"
                          type="text"
                          register={register('educationLevel', {
                            required: 'Education Level is required!',
                          })}
                          error={
                            errors.educationLevel
                              ? errors.educationLevel.message
                              : ''
                          }
                        />

                        <TextInput
                          name="subjectsTaught"
                          label="Subjects Taught"
                          placeholder="Subjects Taught"
                          type="text"
                          register={register('subjectsTaught', {
                            required: 'Subjects Taught is required!',
                          })}
                          error={
                            errors.subjectsTaught
                              ? errors.subjectsTaught.message
                              : ''
                          }
                        />

                        <TextInput
                          name="specializations"
                          label="Specializations"
                          placeholder="Specializations"
                          type="text"
                          register={register('specializations', {
                            required: 'Specializations is required!',
                          })}
                          error={
                            errors.specializations
                              ? errors.specializations.message
                              : ''
                          }
                        />

                        <TextInput
                          name="teachingExperience"
                          label="Teaching Experience (years)"
                          placeholder="Teaching Experience"
                          type="number"
                          register={register('teachingExperience', {
                            required: 'Teaching Experience is required!',
                          })}
                          error={
                            errors.teachingExperience
                              ? errors.teachingExperience.message
                              : ''
                          }
                        />

                        <TextInput
                          name="availability"
                          label="Availability"
                          placeholder="Availability"
                          type="text"
                          register={register('availability', {
                            required: 'Availability is required!',
                          })}
                          error={
                            errors.availability
                              ? errors.availability.message
                              : ''
                          }
                        />

                        <TextInput
                          name="ratePerHour"
                          label="Rate per Hour"
                          placeholder="Rate per Hour"
                          type="number"
                          register={register('ratePerHour', {
                            required: 'Rate per Hour is required!',
                          })}
                          error={
                            errors.ratePerHour
                              ? errors.ratePerHour.message
                              : ''
                          }
                        />

                        <TextInput
                          name="qualifications"
                          label="Qualifications/Certifications"
                          placeholder="Qualifications/Certifications"
                          type="text"
                          register={register('qualifications', {
                            required: 'Qualifications/Certifications are required!',
                          })}
                          error={
                            errors.qualifications
                              ? errors.qualifications.message
                              : ''
                          }
                        />

                        <TextInput
                          name="briefBio"
                          label="Brief Bio/Introduction"
                          placeholder="Brief Bio/Introduction"
                          type="text"
                          register={register('briefBio', {
                            required: 'Brief Bio/Introduction is required!',
                          })}
                          error={errors.briefBio ? errors.briefBio.message : ''}
                        />
                      </>
                    )}

                    {accountType === 'student' &&(
                      <>
                      <TextInput
  name="location"
  label="Location"
  placeholder="Location"
  type="text"
  register={register('location', {
    required: 'Location is required!',
  })}
  error={errors.location ? errors.location.message : ''}
/>

<div className="w-full">
                        <label htmlFor="educationLevel" className="text-sm font-medium text-gray-700">
                          Education Level
                        </label>
                        <select
                          id="educationLevel"
                          name="educationLevel"
                          className=" block w-full bg-slate-200 p-3 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          {...register('educationLevel', { required: 'Education Level is required' })}
                        >
                          <option value="">Select Education Level</option>
                          <option value="elementary_school">Elementary School</option>
                          <option value="middle_school">Middle School</option>
                          <option value="high_school">High School</option>
                          <option value="college_undergraduate">College Undergraduate</option>
                          <option value="college_graduate">College Graduate</option>
                          {/* Add more options as needed */}
                        </select>
                        {errors.educationLevel && (
                          <p className="mt-2 text-sm text-red-500">{errors.educationLevel.message}</p>
                        )}
                      </div>



<TextInput
  name="subjectsOfInterest"
  label="Subjects of Interest"
  placeholder="Subjects of Interest"
  type="text"
  register={register('subjectsOfInterest', {
    required: 'Subjects of Interest is required!',
  })}
  error={errors.subjectsOfInterest ? errors.subjectsOfInterest.message : ''}
/>

<TextInput
  name="tutoringGoals"
  label="Tutoring Goals"
  placeholder="Tutoring Goals"
  type="text"
  register={register('tutoringGoals', {
    required: 'Tutoring Goals is required!',
  })}
  error={errors.tutoringGoals ? errors.tutoringGoals.message : ''}
/>

<TextInput
  name="frequencyOfTutoring"
  label="Frequency of Tutoring"
  placeholder="Frequency of Tutoring"
  type="text"
  register={register('frequencyOfTutoring', {
    required: 'Frequency of Tutoring is required!',
  })}
  error={errors.frequencyOfTutoring ? errors.frequencyOfTutoring.message : ''}
/>

<TextInput
  name="budget"
  label="Budget"
  placeholder="Budget"
  type="number"
  register={register('budget', {
    required: 'Budget is required!',
  })}
  error={errors.budget ? errors.budget.message : ''}
/>

<div className="w-full">
    <label
      htmlFor="additionalComments"
      className="block text-sm font-medium text-gray-700"
    >
      Additional Comments
    </label>
    <textarea
      id="additionalComments"
      name="additionalComments"
      rows="3" // Adjust the number of rows as needed
      placeholder="Additional Comments"
      {...register('additionalComments', {
        required: 'Additional Comments are required!',
      })}
      className={`mt-1 p-2 border ${errors.additionalComments ? 'border-red-500' : 'border-gray-300'} rounded-md w-full focus:outline-none focus:ring focus:border-blue-300`}
    />
    {errors.additionalComments && (
      <p className="mt-2 text-sm text-red-500">
        {errors.additionalComments.message}
      </p>
    )}
  </div>

                      </>
                    )}
                   
         
                    {errMsg && (
                      <span
                        role="alert"
                        className="text-sm text-red-500 mt-0.5"
                      >
                        {errMsg}
                      </span>
                    )}

                    <div className="mt-2">
                      <CustomButton
                        type="submit"
                        containerStyles={`inline-flex justify-center rounded-md bg-blue-600 px-8 py-2 text-sm font-medium text-white outline-none hover:bg-blue-800`}
                        title={isRegister ? 'Create Account' : 'Login Account'}
                      />
                    </div>
                  </form>

                  <div className="mt-4">
                    <p className="text-sm text-gray-700">
                      {isRegister
                        ? 'Already has an account?'
                        : 'Do not have an account'}

                      <span
                        className="text-sm text-blue-600 ml-2 hover:text-blue-700 hover:font-semibold cursor-pointer"
                        onClick={() => setIsRegister((prev) => !prev)}
                      >
                        {isRegister ? 'Login' : 'Create Account'}
                      </span>
                    </p>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default SignUp;

