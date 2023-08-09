import axios from 'axios';
const baseUrl = '/api/persons';

export const getPersons = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (error) {
    console.log(error);
    alert(error);
  }
};

export const addPersons = async (newData, setMessage, setStatus) => {
  timeout(setMessage, setStatus);
  try {
    const response = await axios.post(baseUrl, newData);
    setMessage(`added ${newData.name} successfully`);
    setStatus('success');
    return response.data;
  } catch (error) {
    setMessage(error.response.data.error);
    setStatus('error');
  }
};

export const deletePerson = async (id, setMessage, setStatus) => {
  timeout(setMessage, setStatus);

  try {
    await axios.delete(`${baseUrl}/${id}`);
    setMessage('Deleted successfully');
    setStatus('success');
  } catch (error) {
    setMessage(error.message);
    setStatus('error');
  }
};

export const updatePerson = async (id, newData, setMessage, setStatus) => {
  timeout(setMessage, setStatus);
  try {
    const response = await axios.put(`${baseUrl}/${id}`, newData);
    setMessage('Updated successfully');
    setStatus('success');
    return response.data;
  } catch (error) {
    setMessage(error.response.data.error);
    setStatus('error');
  }
};

// Helper Function
const timeout = (setMessage, setStatus) => {
  setTimeout(() => {
    setMessage(null);
    setStatus(null);
  }, 5000);
};
