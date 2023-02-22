class RoomsChannel < ApplicationCable::Channel 
    def subscribed
        @room = Room.find_by(id: params[:id])
        rooms << @room
        stream_for @room
        
        self.class.broadcast_to @room,
            type: 'RECEIVE_USER',
            user: current_user.slice(:id, :username)
    end

    def unsubscribed
        rooms.delete(@room)

        self.class.broadcast_to @room,
            type: 'REMOVE_USER',
            id: current_user.id
    end

    def self.online_users(room)
        ActionCable.server.connections.filter_map do |connection|
            connection.rooms.include?(room) && connection.current_user
        end.uniq
    end
end