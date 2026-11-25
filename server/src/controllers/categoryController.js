// TODO: Implement public category listing & admin category management
export async function getCategories(req, res, next) {
  try {
    res.json({ categories: [] });
  } catch (error) {
    next(error);
  }
}

export async function createCategory(req, res, next) {
  try {
    res.status(501).json({ message: 'Create category endpoint ready for implementation' });
  } catch (error) {
    next(error);
  }
}

export async function updateCategory(req, res, next) {
  try {
    res.status(501).json({ message: 'Update category endpoint ready for implementation' });
  } catch (error) {
    next(error);
  }
}

export async function deleteCategory(req, res, next) {
  try {
    res.status(501).json({ message: 'Delete category endpoint ready for implementation' });
  } catch (error) {
    next(error);
  }
}
