import { createSlice } from "@reduxjs/toolkit";


export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    allPackages: [],
    allUsers: [],
    fetchBanners: [],
  },

  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
   
    Validate: async (state) =>{
        
    },

    FetchUsers: (state, action) => {
      state.allUsers = action.payload
      // console.log("in counterSlice allUsers" , state.allUsers)
    },

    GetPackages: (state, action) => {
      state.allPackages = action.payload
      // console.log("in counterSlice allPackages" , state.allPackages)
    },

    GetFrames: (state, action) => {
      state.fetchBanners = action.payload
      // console.log("in counterSlice allPackages" , state.allPackages)
    },

    // // Use the PayloadAction type to declare the contents of `action.payload`
    // incrementByAmount: (state, action) => {
    //   state.value += action.payload;
    // },
  },

});

export const { FetchUsers, GetPackages, GetFrames } = counterSlice.actions;

export const packagess = (state) => state.counter.allPackages;

export const allUserss = (state) => state.counter.allUsers;

export const fetchBaners = (state) => state.counter.fetchBanners;

export default counterSlice.reducer;
