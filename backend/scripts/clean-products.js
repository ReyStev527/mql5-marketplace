require('dotenv').config();
const googleSheets = require('../services/googleSheets');

async function cleanDuplicateProducts() {
    console.log('🧹 Cleaning duplicate products...');
    
    try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        console.log('📊 Getting all products...');
        
        const products = await googleSheets.getAllProducts();
        console.log(`Found ${products.length} products`);
        
        // Group products by name to find duplicates
        const productGroups = {};
        products.forEach((product, index) => {
            const name = product.name;
            if (!productGroups[name]) {
                productGroups[name] = [];
            }
            productGroups[name].push({...product, originalIndex: index});
        });
        
        console.log('\n📋 Product analysis:');
        for (const [name, group] of Object.entries(productGroups)) {
            console.log(`  ${name}: ${group.length} entries`);
            if (group.length > 1) {
                console.log(`    ⚠️ DUPLICATE FOUND - Keeping newest, removing ${group.length - 1} duplicates`);
            }
        }
        
        // Find rows to delete (keep only the last occurrence of each product)
        const rowsToDelete = [];
        for (const [name, group] of Object.entries(productGroups)) {
            if (group.length > 1) {
                // Sort by created_at and keep the newest
                group.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                
                // Mark older duplicates for deletion
                for (let i = 1; i < group.length; i++) {
                    rowsToDelete.push(group[i].originalIndex);
                }
            }
        }
        
        if (rowsToDelete.length === 0) {
            console.log('✅ No duplicates found!');
            return;
        }
        
        console.log(`\n🗑️ Deleting ${rowsToDelete.length} duplicate rows...`);
        
        // Access the sheet directly
        const doc = googleSheets.doc;
        const sheet = doc.sheetsByTitle['Products'];
        
        if (!sheet) {
            console.error('❌ Products sheet not found');
            return;
        }
        
        // Get all rows
        const rows = await sheet.getRows();
        
        // Sort in descending order to delete from bottom up (to maintain indices)
        rowsToDelete.sort((a, b) => b - a);
        
        for (const rowIndex of rowsToDelete) {
            if (rows[rowIndex]) {
                console.log(`  Deleting duplicate: ${rows[rowIndex].get('name')}...`);
                await rows[rowIndex].delete();
                await new Promise(resolve => setTimeout(resolve, 500)); // Rate limiting
            }
        }
        
        console.log('✅ Cleanup completed!');
        
        // Verify results
        const cleanedProducts = await googleSheets.getAllProducts();
        console.log(`\n📊 After cleanup: ${cleanedProducts.length} products remaining`);
        
        const finalGroups = {};
        cleanedProducts.forEach(product => {
            finalGroups[product.name] = (finalGroups[product.name] || 0) + 1;
        });
        
        console.log('\n📋 Final product list:');
        for (const [name, count] of Object.entries(finalGroups)) {
            console.log(`  ✅ ${name}: ${count} entry`);
        }
        
    } catch (error) {
        console.error('❌ Error during cleanup:', error);
    }
}

cleanDuplicateProducts();
