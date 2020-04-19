// import * as firebase from 'firebase'

// export default {
//   state: {
//     // availableMeets: [
//     //   { image_url: 'https://pix10.agoda.net/geo/city/318/1_318_02.jpg?s=1920x822', id: '456', title: 'New York', date: new Date, video_url: "https://cdn.publish0x.com/prod/fs/images/4590d7915de7cf7e9347f89b035fae586a01c9690df48f15598640a8be991074.jpeg" },
//     //   { image_url: 'https://cdn.publish0x.com/prod/fs/images/4590d7915de7cf7e9347f89b035fae586a01c9690df48f15598640a8be991074.jpeg', id: '098', title: 'Paris', date: new Date, video_url: "https://cdn.publish0x.com/prod/fs/images/4590d7915de7cf7e9347f89b035fae586a01c9690df48f15598640a8be991074.jpeg" },
//     //   { image_url: 'https://images.unsplash.com/photo-1500759285222-a95626b934cb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80', id: 'cubita', title: 'Cuba', date: new Date, video_url: "https://cdn.publish0x.com/prod/fs/images/4590d7915de7cf7e9347f89b035fae586a01c9690df48f15598640a8be991074.jpeg" },
//     // ],
//     user: null,
//     // loader: false,
//     authUserError: null,
//   },
//   getters: {
//     // loadedAvailableMeets(state) {
//     //   return state.availableMeets.sort((A, B) => {
//     //     return A.date > B.date
//     //   })
//     // },
//     // suggestedLoadedMeets(state, getters) {
//     //   return getters.loadedAvailableMeets.slice(0, 5)
//     // },
//     // loadedOneSelectedMeet(state) {
//     //   return (meetId) => {
//     //     return state.availableMeets.find((specificMeet) => {
//     //       return specificMeet.id === meetId
//     //     })
//     //   }
//     // },
//     getUser(state) {
//       return state.user
//     },
//     // getLoader(state) {
//     //   return state.loader
//     // },
//     getAuthUserError(state) {
//       return state.authUserError
//     }
//   },
//   mutations: {
//     getRegisterUserForMeets(state, payload) {
//       const id = payload.id
//       if (state.user.registeredMeetsIds.findIndex(meetup => meetup.id === id) >= 0) {
//         return
//       }
//       state.user.registeredMeetsIds.push(id)
//       state.user.fbKeys[id] = payload.fbKey
//     },

//     getUnregisteredUserForMeets(state, payload) {
//       const registeredMeets = state.user.registeredMeetsIds
//       registeredMeets.splice(registeredMeets.findIndex(meetup => meetup.id === payload), 1)
//       Reflect.deleteProperty(state.user.fbKeys, payload)
//     },

//     // settingLoadedMeets(state, payload) {
//     //   state.availableMeets = payload
//     // },
//     // meetsCreator(state, payload) {
//     //   state.availableMeets.push(payload)
//     // },
//     // meetsUpdater(state, payload) {
//     //   const meetup = state.availableMeets.find(meetup => {
//     //     return meetup.id === payload.id
//     //   })
//     //   if (payload.title) {
//     //     meetup.title = payload.title
//     //   }
//     //   if (payload.location) {
//     //     meetup.location = payload.location
//     //   }
//     //   if (payload.description) {
//     //     meetup.title = payload.description
//     //   }
//     //   if (payload.date) {
//     //     meetup.date = payload.date
//     //   }
//     // },
//     settingSignedUpUser(state, payload) {
//       state.user = payload
//     },
//     settingSignedInUser(state, payload) {
//       state.user = payload
//     },
//     // settingLoaders(state, payload) {
//     //   state.loader = payload
//     // },
//     settingAuthUserError(state, payload) {
//       state.authUserError = payload
//     },
//     clearSettingAuthUserError(state) {
//       state.authUserError = null
//     }
//   },
//   actions: {
//     registerUserforMeet({ commit, getters }, payload) {
//       commit('settingLoaders', true)
//       //  const user=getters.getUser
//       firebase.database().ref('/users/' + getters.getUser.id).child('/registration/').push(payload)
//         .then(data => {
//           commit('settingLoaders', false)
//           commit('getRegisterUserForMeets', { id: payload, fbKey: data.key })
//         })
//         .catch(error => {
//           console.log(error)
//           commit('settingLoaders', false)
//         })
//     },
//     unRegisterUserforMeet({ commit, getters }, payload) {
//       commit('settingLoaders', true)
//       const user = getters.getUser
//       if (!user.fbKeys) {
//         return
//       }
//       const fbKey = user.fbKeys[payload]
//       firebase.database().ref('/users/' + user.id + '/registration/').child(fbKey).remove()
//         .then(() => {
//           commit('settingLoaders', false)
//           commit('getUnregisteredUserForMeets', payload)
//         })
//         .catch(error => {
//           console.log(error)
//           commit('settingLoaders', false)
//         })
//     },
//     getUserOut({ commit }) {
//       commit('settingSignedInUser', null)
//       firebase.auth().signOut()
//     },
//     // loadAllMeetUps({ commit }) {
//     //   commit('settingLoaders', true)
//     //   firebase.database().ref('meetUps').once('value')
//     //     .then((data) => {
//     //       const chargedMeets = []
//     //       const obj = data.val()
//     //       for (let key in obj) {
//     //         chargedMeets.push({
//     //           id: key,
//     //           title: obj[key].title,
//     //           description: obj[key].description,
//     //           location: obj[key].location,
//     //           image_url: obj[key].image_url,
//     //           date: obj[key].date,
//     //           video_url: obj[key].video_url,
//     //           idCreator: obj[key].idCreator
//     //         })//llamando mediante fetch todos los meets creados
//     //       }

//     //       commit('settingLoadedMeets', chargedMeets)
//     //       commit('settingLoaders', false)
//     //     })
//     //     .catch(error => {
//     //       console.log(error)
//     //       commit('settingLoaders', false)
//     //     })
//     // },

//     // createMeet({ commit, getters }, payload) {
//     //   const newMeet = {
//     //     title: payload.title,
//     //     description: payload.description,
//     //     location: payload.location,
//     //     // image_url: payload.image_url,
//     //     date: payload.date,
//     //     video_url: payload.video_url,
//     //     idCreator: getters.getUser.id
//     //   }
//     //   let image_url;
//     //   let key;
//     //   firebase.database().ref('meetUps').push(newMeet)
//     //     .then((data) => {
//     //       console.log(data)
//     //       key = data.key
//     //       return key
//     //     })
//     //     .then(key => {
//     //       const filename = payload.image.name
//     //       const fileExtension = filename.slice(filename.lastIndexOf('.'))
//     //       return firebase.storage().ref('meetUps/' + key + '.' + fileExtension).put(payload.image)
//     //     })
//     //     .then(fileData => {
//     //       image_url = fileData.metadata.getDownloadURL
//     //       return firebase.database().ref('meetUps').child(key).update({ image_url: image_url })
//     //     })
//     //     .then(() => {
//     //       commit('meetsCreator', {
//     //         ...newMeet,
//     //         image_url: image_url,
//     //         id: key,

//     //       })
//     //     })
//     //     .catch(error => {
//     //       console.log(error)
//     //     })
//     //   // commit('meetsCreator',newMeet)
//     // },
//     // updateMeetDetails({ commit }, payload) {
//     //   commit('settingLoaders')
//     //   const upDatedObj = {};
//     //   if (payload.title) {
//     //     upDatedObj.title = payload.title
//     //   }
//     //   if (payload.description) {
//     //     upDatedObj.description = payload.description
//     //   }
//     //   if (payload.description) {
//     //     upDatedObj.location = payload.location
//     //   }
//     //   if (payload.date) {
//     //     upDatedObj.date = payload.date
//     //   }
//     //   firebase.database().ref('meetUps').child(payload.id).update(upDatedObj)
//     //     .then(() => {
//     //       commit('settingLoaders', false)
//     //       commit('meetsUpdater', payload)

//     //     })
//     //     .catch(err => {
//     //       console.log(err)
//     //       commit('settingLoaders', false)
//     //     })
//     // },

//     createSignedUpUser({ commit }, userInfo) {
//       commit('settingLoaders', true)
//       commit('clearSettingAuthUserError')
//       firebase.auth().createUserWithEmailAndPassword(userInfo.email, userInfo.password)
//         .then(
//           user => {
//             commit('settingLoaders', false)
//             const newUser = {
//               id: user.uid,
//               registeredMeetsIds: [],
//               fbKeys: {}
//             }
//             commit('settingSignedUpUser', newUser)
//           }
//         )
//         .catch(
//           error => {
//             commit('settingLoaders', false)
//             commit('settingAuthUserError', error)
//             console.log(error)
//           }
//         )
//     },
//     clearError({ commit }) {
//       commit('clearSettingAuthUserError')
//     },
//     keepUserSigned({ commit }, payload) {
//       commit('settingSignedUpUser', {
//         id: payload.uid,
//         registeredMeetsIds: [],
//         fbKeys: {}
//       })
//     },

//     signUserIn({ commit }, userInfo) {
//       firebase.auth().signInWithEmailAndPassword(userInfo.email, userInfo.password)

//         .then(
//           user => {
//             const newUser = {
//               id: user.uid,
//               registeredMeetsIds: [],
//               fbKeys: {}
//             }
//             commit('clearSettingAuthUserError')//ojo, esto se suponia iria despues del firebase 
//             commit('settingSignedInUser', newUser)
//           }
//         )
//         .catch(
//           error => {
//             commit('settingAuthUserError', error)
//             console.log(error)
//           }
//         )
//     },
//     keepUserSignedData({commit,getters}){
//       commit('settingLoaders', true)
//       firebase.database().ref('/users/'+ getters.getUser.id+'/registration/').once('value') 
//       .then(data=>{
//         const dataPairs=data.val()
//         let invertDataPairs={}
//         let registeredUserMeets =[]
//          for(let key in dataPairs ){
//            registeredUserMeets.push(dataPairs[key])
//            invertDataPairs[dataPairs[key]]=key
//          }
//          console.log(registeredUserMeets)
//          console.log(invertDataPairs)
//          const myUpdatedSignedUserData={
//            id:getters.getUser.id,
//            registeredMeetsIds:registeredUserMeets,
//            fbKeys:invertDataPairs,
//          }
//          commit('settingLoaders', false)
//          commit('settingSignedInUser', myUpdatedSignedUserData)
//       })
//       .catch(err => {
//         console.log(err)
//         commit('settingLoaders', false)
//       })  
      
      
//     }
//   },

// }
