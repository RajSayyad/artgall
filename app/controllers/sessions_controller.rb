class SessionsController < Devise::SessionsController
  skip_before_action :verify_authenticity_token
  respond_to :json

  private

  def respond_with(resource, _opts = {})
    if current_user
      render json: { message: "Logged in successfully.", user: current_user }, status: :ok
    else
      render json: { error: "User not found or invalid credentials." }, status: :unauthorized
    end
  end

  def respond_to_on_destroy
    if current_user
      render json: { message: "Logged out." }, status: :ok
    else
      render json: { message: "User not logged in." }, status: :unauthorized
    end
  end
end
