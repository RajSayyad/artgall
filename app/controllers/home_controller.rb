class HomeController < ApplicationController
  def index
    respond_to do |format|
      format.html  # renders app/views/home/index.html.erb or similar
      format.any { head :not_acceptable } # fallback for unknown formats
    end
  end
end
