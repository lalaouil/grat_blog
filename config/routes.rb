Rails.application.routes.draw do

  get 'markers/index'

  resources :stories

  resources :markers, only: [:index, :create]

  root to: "sites#home"
  get "/stories", to: "stories#index"

  get "/signout", to: "sessions#destroy"

  match 'auth/:provider/callback', to: 'sessions#create', via: [:get, :post]

  match 'auth/failure', to: redirect('/'), via: [:get, :post]
 
end
