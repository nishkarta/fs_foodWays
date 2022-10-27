package repositories

import (
	"foodways/models"

	"gorm.io/gorm"
)

type TransactionRepository interface {
	FindTransactions() ([]models.Transaction, error)
	GetTransactionByID(ID int) (models.Transaction, error)
	AddTransaction(transaction models.Transaction) (models.Transaction, error)
	UpdateTransaction(transaction models.Transaction, ID int) (models.Transaction, error)
	DeleteTransaction(transaction models.Transaction, ID int) (models.Transaction, error)
}

func RepositoryTransaction(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) FindTransactions() ([]models.Transaction, error) {
	var Transaction []models.Transaction
	err := r.db.Preload("UserOrder").Preload("Order").Find(&Transaction).Error

	return Transaction, err
}

func (r *repository) GetTransactionByID(ID int) (models.Transaction, error) {
	var Transaction models.Transaction
	err := r.db.Preload("UserOrder").Preload("Order").First(&Transaction, ID).Error

	return Transaction, err
}

func (r *repository) AddTransaction(transaction models.Transaction) (models.Transaction, error) {
	err := r.db.Create(&transaction).Error

	return transaction, err
}

func (r *repository) UpdateTransaction(transaction models.Transaction, ID int) (models.Transaction, error) {
	// err := r.db.Save(&transaction).Error
	err := r.db.Model(&transaction).Where("id=?", ID).Updates(&transaction).Error

	return transaction, err
}
func (r *repository) DeleteTransaction(transaction models.Transaction, ID int) (models.Transaction, error) {
	err := r.db.Delete(&transaction).Error

	return transaction, err
}
