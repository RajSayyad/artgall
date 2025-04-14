require_relative "boot"

require "rails/all"
require "active_storage/engine"
ENV["PUPPETEER_EXECUTABLE_PATH"] = "/Users/rajsayyad/Developer/myRORR_Projects/artgall/node_modules/puppeteer-core/.local-chromium/mac-1045629/chrome-mac/Chromium.app/Contents/MacOS/Chromium"


# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)
module Artgall
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 7.2
    config.middleware.use ActionDispatch::Cookies
    config.middleware.use ActionDispatch::Session::CookieStore
    config.middleware.use ActionDispatch::Flash
    config.api_only = true
    config.active_job.queue_adapter = :sidekiq
    Grover.configure do |config|
      config.options = {
        base_url: "http://localhost:3000"
      }
    end
    config.enable_local_file_access = true




    # Please, add to the `ignore` list any other `lib` subdirectories that do
    # not contain `.rb` files, or that should not be reloaded or eager loaded.
    # Common ones are `templates`, `generators`, or `middleware`, for example.
    config.autoload_lib(ignore: %w[assets tasks])

    # Configuration for the application, engines, and railties goes here.
    #
    # These settings can be overridden in specific environments using the files
    # in config/environments, which are processed later.
    #
    # config.time_zone = "Central Time (US & Canada)"
    # config.eager_load_paths << Rails.root.join("extras")
  end
end
