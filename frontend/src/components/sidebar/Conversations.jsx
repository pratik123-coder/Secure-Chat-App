import useGetConversations from "../../hooks/useConversation";
import Convo from "./Convo";

const Conversations = () => {
	const {loading,conversations} = useGetConversations();
	console.log("Conversations:", conversations);
	return (
		<div className='py-2 flex flex-col overflow-auto'>
			{conversations.map((conversation,index) => {
				return <Convo key={conversation._id} conversation={conversation} lastIndex={index === conversations.length -1} />
      })}
			{loading ? <span className='loading loading-spinner mx-auto'></span> : null}
		</div>
	);
};
export default Conversations;