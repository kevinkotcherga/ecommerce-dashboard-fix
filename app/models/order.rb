class Order < ApplicationRecord
  def self.revenue
    total = sum do |order|
      order.quantity * order.unit_price
    end
    total.round(2)
  end

  def self.average_revenue_per_order
    total = sum do |order|
      order.quantity * order.unit_price
    end
    orders = []
    all.each do |order|
      orders << order.order_id
    end
    (total.round(2) / orders.uniq.count).round(2)
  end

  def self.list_of_country
    list_country = []
    all.each do |country|
      list_country << country.country
    end
    list_country.uniq
  end

  def self.customers
    customers = []
    all.each do |customer|
      customers << customer.customer_id
    end
    customers.uniq.count
  end

  def self.list_of_country_sql
    sql = <<-SQL
      SELECT DISTINCT(country) FROM orders
    SQL
    ActiveRecord::Base.connection.execute(sql).to_a.map do |country_row|
      country_row['country']
    end
  end

  def self.revenue_sql
    sql = <<-SQL
    SELECT SUM(unit_price * quantity) FROM orders
    SQL
    ActiveRecord::Base.connection.execute(sql).to_a.map do |revenue_row|
      revenue_row['sum'].round(2)
    end
  end
end
