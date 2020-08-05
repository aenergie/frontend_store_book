import axios from "axios";
export default {
    namespaced: true,
    state: {
        token:null,
        user: null
    },
    getters: {
        authenticated (state) {
            return state.token;
        },
        user (state){
            return state.user;
        }
    },
    actions: {
        signIn({dispatch}, user){
            return new Promise( ( resolve, reject ) => {
                axios.post('api/login', user).then(response => {
                    dispatch('attempt', response.data.access_token ); 
                    resolve();
                }).catch(err=>{
                    reject( err )
                });
            })
        },
        async attempt({commit, state}, token){
            if(token)
            {
                commit('SET_TOKEN', token);
            }

            if(!state.token)
            {
                return;
            }
            
            try {
                let response = await axios.get('api/me');
                commit('SET_USER', response.data);
            }
            catch(e)
            {
                commit('SET_TOKEN', null);
                commit('SET_USER', null)
            }
        },
        async signOut({commit})
        {
            let response = await axios.get('api/logout');
            console.log(response);
            commit('SET_TOKEN', null);
            commit('SET_USER', null)
            window.location.reload();
        }
    },
    mutations: {
        SET_TOKEN (state, token){
            state.token = token;
        },
        SET_USER (state, data){
            if( data )
            {
                state.user = {
                    id: data.id,
                    name: data.name, 
                    email: data.email
                };
            }
            else
            {
                state.user = null;
            }
            
        }
    }
};
