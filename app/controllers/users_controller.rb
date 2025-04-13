class UsersController < ApplicationController
  def current
    if current_user
      render json: current_user, status: :ok
    else
      render json: { error: "No user logged in" }, status: :unauthorized
    end
  end
end
