class SessionsController < Devise::SessionsController
  respond_to :json

  def create
    super
  end

  def destroy
    super
  end

  private

  def respond_with(resource, _opts = {})
    render json: { message: "Login", user: current_user }, status: :ok
  end

  def respond_to_on_destroy
    render json: { message: "Logged out." }, status: :ok
  end
end
