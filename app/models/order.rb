class Order < ApplicationRecord
  # Liste des pays
  def self.list_of_country
    list_of_country = []
    Order.all.each do |order|
      list_of_country << order.country
    end
    list_of_country.uniq
  end

  # Calcule des revenues
  def self.revenue
    # Les ordres sont parcourus, les quantités de chacun sont
    # multipliés par leur prix et tout est additoné avec sum
    total = Order.sum do |element|
      element.unit_price * element.quantity
    end
    # Le résultat s'arrête 2 chiffres aprex la virgule
    result = total.round(2)
    return result
  end

  # Calcule du nombre de clients
  def self.customers
    customers = []
    orders = Order.all
    # Les ordres sont parcourus, chaque customer_id est envoyé dans customers
    orders.each { |order| customers << order.customer_id }
    # Le nombre de customer_id unique est compté
    return customers.uniq.count
  end

  # Revenue moyen par commande
  def self.average_revenue_per_order
    # Les ordres sont parcourus, les quantités de chacun sont
    # multipliés par leur prix et tout est additoné avec sum
    total = Order.sum do |element|
      element.unit_price * element.quantity
    end
    result = total.round(2)
    # Le résultat s'arrête 2 chiffres aprex la virgule
    number_of_unique_orders = []
    orders = Order.all
    # Les ordres sont parcourus, chaque customer_id est envoyé dans customers
    orders.each { |order| number_of_unique_orders << order.order_id }
    # Le nombre de customer_id unique est compté
    unique_order = number_of_unique_orders.uniq.count
    resultat = (result / unique_order).to_f
    return resultat.round(2)
  end

  def self.revenue_per_month
    orders = Order.all
    months = []
    orders.each do |order|
      months << order.date.strftime("%Y-%m-%d")
    end
    return months
  end
end
