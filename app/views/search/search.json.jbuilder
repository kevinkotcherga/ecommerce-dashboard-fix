# frozen_string_literal: true

# search.json affiche mes résultats json à partir de search_controller à l'adresse localhost:3000/search.json
json.orders do
  json.array!(@orders) do |order|
    json.date order.date
    json.order_id order.order_id
    json.customer_id order.customer_id
    json.country order.country
    json.product_code order.product_code
    json.product_description order.product_description
    json.quantity order.quantity
    json.unit_price order.unit_price
  end
end
