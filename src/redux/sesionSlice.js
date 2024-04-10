import { createSlice } from "@reduxjs/toolkit"

const initialSesion = { 
    token:'inicialToken',
    tipoUser: 'user',
};

export const sesionSlice = createSlice({
    name: 'sesionSlice',
    initialState: initialSesion,
    reducers: {
        setSession: (state, action) => {
            const { token, tipoUser } = action.payload;
            state.token= token;
            state.tipoUser= tipoUser;
        },
        setToken:(state, action)=>{
            state.token = action.payload;
        }
    }
})

export const { setSession, setToken } = sesionSlice.actions;

export default sesionSlice.reducer;
