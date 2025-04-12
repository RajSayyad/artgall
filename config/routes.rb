Rails.application.routes.draw do
  root "home#index"
  get "/current_user", to: "users#current"
  devise_for :users,
  controllers: {
    sessions: "sessions"
  }
  get "*path", to: "home#index", via: :all
end
