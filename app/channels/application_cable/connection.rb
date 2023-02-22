module ApplicationCable
  class Connection < ActionCable::Connection::Base
    # will add code here

    identified_by :current_user

    def connect 
      self.current_user = find_verified_user
    end

    def rooms
      @rooms ||= []
    end

    private

    def find_verified_user
      if current_user = User.find_by(session_token: request.session[:session_token])
        current_user
      else
        reject_unauthorized_connection
      end
    end
  end
end
