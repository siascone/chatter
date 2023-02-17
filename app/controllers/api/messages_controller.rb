class Api::MessagesController < ApplicationController
    wrap_parameters include: Message.attribute_names + ['roomId'] + ['authorId']
    before_action :require_logged_in

    def create 
        
        @message = Message.new(message_params)

        if @message.save
            RoomsChannel.broadcast_to @message.room,
                type: 'RECEIVE_MESSAGE',
                **form_template('api/messages/show', message: @message)

            @message.mentions.includes(:user, message: [:room]).each do |mention|
                
                MentionsChannel.broadcast_to mention.user,
                    type: 'RECEIVE_MENTION',
                    **form_template('api/mentions/show', mention: mention)
            end

            render json: nil, status: :ok
        else
            render json: @message.errors.full_messages, status: 422
        end
    end

    def destroy
        @message = Message.find(params[:id])
        @message.destroy
        
        RoomsChannel.broadcast_to @message.room,
            type: 'DESTROY_MESSAGE',
            id: @message.id
        render json: nil, status: :ok
    end

    private 

    def message_params
        params.require(:message).permit(:body, :room_id, :author_id)
    end
end
