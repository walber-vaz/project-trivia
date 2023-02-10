const fetchApi = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error({ error: error.message });
  }
};

export default fetchApi;
