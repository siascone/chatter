class Api::MessagesController < ApplicationController
    wrap_parameters include: Message.attribute_names
    before_action :require_logged_in

    def create 
        @message = Message.new(message_params)

        if @message.save
            # will add code here
            render :show, locals: { message: @message }
        else
            render json: @message.errors.full_messages, status: 422
        end
    end

    def destroy
        @message = Message.find(params[:id])
        @message.destroy
        # will add code here
        render json: nil, status: :ok
    end

    private 

    def message_params
        params.require(message).permit(:body, :room_id, :author_id)
    end
end
