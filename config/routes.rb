Rails.application.routes.draw do
  root "home#index"
  get "/current_user", to: "users#current"
  resources :posts, only: [ :index, :create, :show ], params: :id
  devise_for :users,
  controllers: {
    sessions: "sessions"
  }
  get "*path", to: "home#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
