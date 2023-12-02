import getConversationById from "@/actions/getConversationById"
import getMessages from "@/actions/getMessages"
import ConversationBody from "@/components/ConversationBody"
import ConversationHeader from "@/components/ConversationHeader"
import EmptyState from "@/components/EmptyState"
import Form from "@/components/Form"

interface Params {
    conversationId: string
}
const OneConversationPage = async ({ params }: { params: Params }) => {

    const conversation = await getConversationById(params.conversationId)
    const messages = await getMessages(params.conversationId)

    if (!conversation) {
        return (
            <div className="lg:pl-80 h-full">
                <div className="h-full flex flex-col ">
                    <EmptyState />
                </div>
            </div>
        )
    }

    return (
        <div className="lg:pl-80 h-full">
            <div className=" h-full flex flex-col">
                <ConversationHeader conversation={conversation} />
                <ConversationBody initialMessages={messages}/>
                <Form/>
            </div>
        </div>
    )
}

export default OneConversationPage
