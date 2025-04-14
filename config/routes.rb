Rails.application.routes.draw do
  root "home#index"
  get "/current_user", to: "users#current"
  resources :posts, only: [ :index, :create, :show, :update, :destroy ], param: :id do
    collection do
      get :my_posts
    end
  end
  devise_for :users,
  controllers: {
    sessions: "sessions"
  }
  resource :pdfs, only: [ :create ] do
    get :download
  end

  direct :rails_blob do |blob|
    route_for(:rails_service_blob, blob.signed_id, blob.filename)
  end

  get "*path", to: "home#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
