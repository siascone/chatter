class User < ApplicationRecord

    has_secure_password

    validates :username,
        length: { in: 3..30 },
        uniqueness: true,
        format: { without: URI::MailTo::EMAIL_REGEXP, message: "username can't be an email" }
    validates :email,
        length: { in: 6..255 },
        uniqueness: true,
        format: { with: URI::MailTo::EMAIL_REGEXP }
    validates :password,
        length: { in: 6..255 }, allow_nil: true
    validates :session_token,
        presence: true,
        uniqueness: true

    has_many :mentions


    before_validation :ensure_session_token

    def self.find_by_credentials(username, password)
        user = User.find_by(username: username)
        # has_secure_password gives us the authenticate method
        if user&.authenticate(password) 
            return user
        else
            nil 
        end
    end

    def ensure_session_token
        self.session_token ||= generate_unique_session_token
    end

    def reset_session_token!
        self.session_token = generate_unique_session_token
        save!
        session_token
    end

    private

    def generate_unique_session_token
        while true
            token = SecureRandom.urlsafe_base64
            return token unless User.exists?(session_token: token)
        end
    end
end
