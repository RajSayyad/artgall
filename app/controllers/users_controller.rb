class UsersController < ApplicationController
  before_action :authenticate_user!

  def current
    if current_user
      render json: current_user
    else
      render json: { error: "No user logged in" }, status: :unauthorized
    end
  end
end
