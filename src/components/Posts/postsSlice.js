import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import * as api from '../../api/index'

export const fetchAllPostsActionCreator = createAsyncThunk(
    'posts/fetchAll',
    async () => {
        try {
            const response = await api.fetchPosts()
            return response.data
        } catch (err) {
            console.log(err)
        }
    }
)

export const createPostActionCreator = createAsyncThunk(
    'posts/create',
    async (post) => {
        try {
            const {data} = await api.createPost(post)
            return data
        } catch (err) {
            console.log(err)
        }
    }
)

export const updatePostActionCreator = createAsyncThunk(
    'posts/update',
    async ({currentId, postData}) => {
        try {
            const response = await api.updatePost(currentId, postData)
            return response.data
        } catch (err) {
            console.log(err)
        }
    }
)

export const deletePostActionCreator = createAsyncThunk(
    'posts/delete',
    async (id) => {
        try {
            await api.deletePost(id)
            return id
        }catch (err){
            console.log(err)
        }
    }
)

export const likePostActionCreator = createAsyncThunk(
    'posts/likePost',
    async (currentId) => {
        try {
            const response = await api.likePost(currentId)
            return response.data
        } catch (err) {
            console.log(err)
        }
    }
)

const postsSlice = createSlice({
    name: 'posts',
    initialState: [],
    reducers: {},
    extraReducers: {
        [fetchAllPostsActionCreator.fulfilled]: (state, {payload}) => {
            return [...payload]
        },
        [createPostActionCreator.fulfilled]: (state, {payload}) => {
            state.push(payload)
        },
        [updatePostActionCreator.fulfilled]: (state, {payload}) => {
            let postToUpdate = state.find(post => post._id === payload._id)
            if (postToUpdate){
                postToUpdate.creator = payload.creator
                postToUpdate.title = payload.title
                postToUpdate.message = payload.message
                postToUpdate.tags = payload.tags
                postToUpdate.selectedFile = payload.selectedFile
            }
        },
        [deletePostActionCreator.fulfilled]: (state, {payload}) => {
            return state.filter((post) => post._id !== payload)
        },
        [likePostActionCreator.fulfilled]: (state, {payload}) => {
            return state.map((post) => post._id === payload._id ? payload : post)
        }
    }
})


export default postsSlice