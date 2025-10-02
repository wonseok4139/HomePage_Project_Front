import boardApi from './boardApi';

// 게시글 목록 조회 또는 검색 (GET)
export const getAllPosts = async (title = '') => {
  try {
    const response = await boardApi.get('/getAllPosts', {
      params: {
        title: title
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching all posts:", error);
    throw error;
  }
};

// 특정 게시글 상세 조회 (GET)
export const getPostDetail = async (id) => {
  try {
    const response = await boardApi.get(`/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching post with id ${id}:`, error);
    throw error;
  }
};

// 게시글 작성 (POST)
export const insertBoard = async (postData) => {
  try {
    const response = await boardApi.post('/insertBoard', postData);
    return response.data;
  } catch (error) {
    console.error("Error inserting post:", error);
    throw error;
  }
};

// 게시글 수정 (PUT)
export const updatePost = async (id, updatedData) => {
  try {
    const response = await boardApi.put(`/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error(`Error updating post with id ${id}:`, error);
    throw error;
  }
};

// 게시글 삭제 (DELETE)
export const deleteBoard = async (id) => {
  try {
    const response = await boardApi.delete(`/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting post with id ${id}:`, error);
    throw error;
  }
};