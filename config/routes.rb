Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

    namespace :api, defaults: {format: :json} do
      resources :users, only: [:create]
      resource :session, only: [:create, :show, :destroy]

      resources :mentions, only: [:index] do 
        patch 'read', on: :member
      end

      resources :rooms, only: [:index, :show, :create, :destroy]
      resources :messages, only: [:create, :destroy]
    end

    
end
