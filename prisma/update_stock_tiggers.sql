DELIMITER //

CREATE TRIGGER sumar_stock_pedido
AFTER DELETE ON Pedidos
FOR EACH ROW
BEGIN
  DECLARE cantidad_pedido INT;
  DECLARE producto_id INT;
  
  SELECT cantidad, productoId INTO cantidad_pedido, producto_id
  FROM Pedidos
  WHERE id = OLD.id;
  
  UPDATE Productos
  SET stock = stock + cantidad_pedido
  WHERE id = producto_id;
END //

DELIMITER ;

DELIMITER //
CREATE TRIGGER restar_stock_pedido
AFTER INSERT ON Pedidos
FOR EACH ROW
BEGIN
  UPDATE Productos
  SET stock = stock - NEW.cantidad
  WHERE id = NEW.productoId;
END //
DELIMITER ;