Rails.application.routes.draw do
  resources :notes, only: [:index]
  get '/orders/download_csv'
  get :search, controller: :search

  # fallback#index retourne le front react
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
