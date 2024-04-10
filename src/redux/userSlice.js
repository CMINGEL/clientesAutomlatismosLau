import { createSlice } from "@reduxjs/toolkit"

const initialState = { 
    name:'inicialName',
    username: 'inicialUsername',
    email:'inicialEmail'
};

export const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        addUser: (state, action) => {
            // const { name, username, email } = action.payload;
            state.name= action.payload.name;
            state.username= action.payload.username;
            state.email= action.payload.email;
        },
        changeEmail:(state, action)=>{
            state.email = action.payload;
        },
    },
});



export const { addUser, changeEmail } = userSlice.actions;

export default userSlice.reducer;