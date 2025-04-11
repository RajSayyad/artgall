Rails.application.routes.draw do
  root "home#index"
  devise_for :users,
  controllers: {
    sessions: "sessions"
  }
end
