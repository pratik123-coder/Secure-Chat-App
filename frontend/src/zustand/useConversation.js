import {create} from 'zustand'

const useConversation = create((set) => ({
  selectedConveration:null,
  setSelectedConversation:(selectedConveration) => set({selectedConveration}),
  messages:[],
  setMessages:(messages) => set({messages}),

}));

export default useConversation;