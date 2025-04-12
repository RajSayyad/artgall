Rails.application.routes.draw do
  root "home#index"
  devise_for :users,
  controllers: {
    sessions: "sessions"
  }
  get "*path", to: "home#index", via: :all
end
