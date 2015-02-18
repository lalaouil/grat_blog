Rails.application.routes.draw do

  resources :stories

  root to: "sites#index"
  get "/stories", to: "stories#index"

  get "/signout", to: "sessions#destroy"

  match 'auth/:provider/callback', to: 'sessions#create', via: [:get, :post]

  match 'auth/failure', to: redirect('/'), via: [:get, :post]
 
end
