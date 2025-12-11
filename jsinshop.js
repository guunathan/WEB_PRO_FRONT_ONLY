 /*js หน้าmainshopping นะอันนี้ */

        function increaseQuantity() {
            const input = document.getElementById('quantity');
            input.value = parseInt(input.value) + 1;
        }

        function decreaseQuantity() {
            const input = document.getElementById('quantity');
            if (parseInt(input.value) > 1) {
                input.value = parseInt(input.value) - 1;
            }
        }
        function toggleDescription() {
            const detailText = document.getElementById('detailtext');
            const btn = document.getElementById('showmorebtn');
            
            if (detailText.classList.contains('expanded')) {
                detailText.classList.remove('expanded');
                btn.textContent = 'showmore';
            } else {
                detailText.classList.add('expanded');
                btn.textContent = 'Show less';
            }
        }
        document.querySelectorAll('.filter-option').forEach(button => {
            button.addEventListener('click', function() {
                const parent = this.parentElement;
                parent.querySelectorAll('.filter-option').forEach(btn => {
                    btn.classList.remove('active');
                });
                this.classList.add('active');
            });
        });
        document.querySelectorAll('.thumbnail').forEach(thumb => {
            thumb.addEventListener('click', function() {
                document.querySelectorAll('.thumbnail').forEach(t => {
                    t.classList.remove('active');
                });
                this.classList.add('active');
            });
        });