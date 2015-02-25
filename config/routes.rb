Rails.application.routes.draw do
   root to: "sites#home"

  get 'markers/index'

  resources :stories

  resources :markers, only: [:index, :create]

 
  get "/stories", to: "stories#index"

  get "/signout", to: "sessions#destroy"

  match 'auth/:provider/callback', to: 'sessions#create', via: [:get, :post]

  match 'auth/failure', to: redirect('/'), via: [:get, :post]
 
end
